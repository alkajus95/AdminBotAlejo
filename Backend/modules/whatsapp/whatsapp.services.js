import axios from 'axios';

export const sendWhatsappMessage = async (toNumber, message) => {
    const cleanNumber = toNumber.replace(/\D/g, '');
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.PHONE_ID;
    const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;

    // --- DEBUG DE SEGURIDAD ---
    console.log("-----------------------------------------");
    console.log("🔍 VALIDANDO TOKEN NUEVO:");
    if (token) {
        console.log(`Token detectado: ${token.substring(0, 7)}...${token.slice(-5)}`);
    } else {
        console.log("❌ ERROR: El servidor no ve ningún token. Revisa tu .env");
    }
    console.log("-----------------------------------------");

    const data = {
        messaging_product: "whatsapp",
        to: cleanNumber,
        type: "text",
        text: { body: message }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("✅ META RECIBIÓ EL MENSAJE CORRECTAMENTE");
        console.log("ID:", response.data.messages[0].id);
        return response.data;
    } catch (error) {
        console.log("❌ ERROR AL ENVIAR CON EL NUEVO TOKEN:");
        if (error.response) {
            // Aquí veremos si el token es inválido o expiró
            console.log(JSON.stringify(error.response.data, null, 2));
        } else {
            console.log("Error de conexión:", error.message);
        }
        throw error;
    }
};