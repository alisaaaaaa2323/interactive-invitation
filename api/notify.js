module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { action, time } = req.body || {};

    if (!["yes", "no"].includes(action)) {
        return res.status(400).json({
            error: "Invalid action"
        });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({
            error: "Telegram is not configured"
        });
    }

    const message = action === "yes"
        ? `❤️ Ответ: ДА!\nВремя: ${time || "Не указано"}`
        : "💌 Ответ: НЕТ";

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            }
        );

        const data = await response.json();

        if (!data.ok) {
            return res.status(500).json({
                error: "Telegram notification failed"
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            error: "Server error"
        });
    }
}
