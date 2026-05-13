import { sendWhatsappMessage } from "./whatsapp.services.js";

export const sendMessage = async (req, res) => {
    const { phone, message } = req.body;

    try {
        const data = await sendWhatsappMessage(phone, message);
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error sending WhatsApp message",
            err: error
        });
    }
};