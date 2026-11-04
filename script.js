function openInvitation() {
    document.getElementById("details").classList.remove("hidden");
}

async function sendAnswer(action) {
    const result = document.getElementById("result");

    if (action === "yes") {
        result.textContent = "Ура! ❤️ Буду ждать тебя!";
    } else {
        result.textContent = "Очень жаль, но спасибо за ответ 💌";
    }

    // Демонстрационный ответ.
    // Уведомление в Telegram подключим отдельно.
}
