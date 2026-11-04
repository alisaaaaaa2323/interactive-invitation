unction openInvitation() {
    document.getElementById("details").classList.remove("hidden");
}

async function sendAnswer(action) {
    const result = document.getElementById("result");

    result.textContent = "Отправляем ответ...";

    try {
        const response = await fetch("/api/notify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: action,
                time: new Date().toLocaleString("ru-RU")
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        result.textContent = action === "yes"
            ? "Ура! ❤️ Ответ отправлен!"
            : "Спасибо за ответ 💌";

    } catch (error) {
        result.textContent = "Не удалось отправить ответ.";
        console.error(error);
    }
