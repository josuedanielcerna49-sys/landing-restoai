// Chat Q&A de RestoAI / La Cacerola.
// La lógica es simple y local: usa palabras clave y la base de conocimiento del archivo TXT.

document.addEventListener("DOMContentLoaded", () => {
    const widget = document.querySelector(".restoai-chat-widget");
    const toggleButton = document.querySelector(".restoai-chat-toggle");
    const closeButton = document.querySelector(".restoai-chat-close");
    const form = document.querySelector("#restoai-chat-form");
    const input = document.querySelector("#restoai-chat-input");
    const messages = document.querySelector("#restoai-chat-messages");

    if (!widget || !toggleButton || !closeButton || !form || !input || !messages) {
        return;
    }

    // Copia de respaldo basada en base-conocimiento-restoai.txt.
    // Se usa si el navegador no permite cargar el TXT al abrir el HTML como archivo local.
    let knowledgeBase = `
RestoAI / La Cacerola es un sistema digital para restaurantes asistido por Lili, una asistente virtual diseñada para mejorar la atención al cliente y ordenar la operación diaria del negocio.
El sistema combina un Panel de Administración para el personal y un Chat del cliente atendido por Lili.
El panel permite gestionar ventas, pedidos, reservas, mesas, menú, precios por sucursal, sucursales, facturación, clientes, reclamos, notificaciones, alertas, monitor de chat y analíticas.
Lili puede mostrar menú, ayudar con pedidos para recoger o domicilio, consultar sucursales y horarios, consultar estado de pedidos, recibir reclamos y agendar reservas.
RestoAI ayuda a atender más rápido, reducir procesos manuales, centralizar información, ordenar pedidos, mejorar reservas, controlar reclamos y tomar mejores decisiones con reportes.
El monitor de chat permite supervisar conversaciones, tomar control humano y devolver la conversación al bot.
Las alertas de sentimiento ayudan a detectar clientes molestos o insatisfechos para intervenir a tiempo.
Las analíticas muestran reportes sobre ventas, pedidos, comportamiento de clientes y tendencias.
Si preguntan por precios, implementación, soporte, integraciones externas, WhatsApp Business API, pagos en línea, seguridad avanzada, hosting, app móvil o sistemas contables, debe revisarse en una demo o con contacto comercial.
Si preguntan por acceso demo, el acceso demo será proporcionado por el supervisor o equipo comercial cuando corresponda.
No revelar credenciales, contraseñas, accesos, URLs internas, configuraciones privadas ni datos internos. Para temas de acceso, se debe contactar al equipo de Simplexity.
`;

    const restrictedAnswer = "Solo puedo responder preguntas sobre RestoAI / La Cacerola.";
    const commercialAnswer = "No tengo esa información confirmada en la base de conocimiento. Para revisarlo con precisión, lo ideal es coordinar una demo o contacto comercial.";
    const demoAccessAnswer = "El acceso demo será proporcionado por el supervisor o equipo comercial cuando corresponda.";
    const sensitiveAccessAnswer = "No puedo proporcionar credenciales ni datos internos. Para temas de acceso, por favor contacta al equipo de Simplexity.";

    const demoAccessKeywords = [
        "acceso demo", "demo acceso", "entrar al demo", "entrar a la demo",
        "login demo", "usuario demo", "cuenta demo", "url demo", "link demo",
        "acceso", "accesos", "login", "inicio de sesion", "inicio de sesión",
        "iniciar sesion", "iniciar sesión", "entrar", "ingresar"
    ];

    const sensitiveAccessKeywords = [
        "credencial", "credenciales", "contraseña", "contrasena", "password",
        "dato interno", "datos internos",
        "url interna", "urls internas", "configuracion privada", "configuración privada",
        "token", "api key", "apikey", "secreto", "secret", "clave", "claves",
        "admin", "administrador"
    ];

    const commercialKeywords = [
        "precio", "precios", "costo", "costos", "plan", "planes", "tarifa", "tarifas",
        "soporte", "implementacion", "implementación", "instalacion", "instalación",
        "integracion", "integración", "integraciones", "whatsapp business api",
        "pagos en linea", "pagos en línea", "seguridad", "hosting", "app movil",
        "app móvil", "contable", "contables", "erp", "api"
    ];

    const allowedKeywords = [
        "restoai", "la cacerola", "lili", "restaurante", "restaurantes", "pedido", "pedidos",
        "reserva", "reservas", "mesa", "mesas", "menu", "menú", "sucursal", "sucursales",
        "facturacion", "facturación", "cliente", "clientes", "reclamo", "reclamos",
        "monitor", "chat", "sentimiento", "alerta", "alertas", "analitica", "analítica",
        "analiticas", "analíticas", "notificacion", "notificación", "notificaciones",
        "punto de venta", "pos", "venta", "ventas", "panel", "administracion",
        "administración", "caja", "cobrar", "comprobante", "domicilio", "recoger",
        "horario", "horarios", "beneficio", "beneficios", "funciona", "funciones",
        "que es", "qué es", "hace", "sirve", "sistema", "plataforma", "demo",
        "contacto", "comercial"
    ];

    const answerBank = [
        {
            keywords: ["lili", "asistente", "bot"],
            answer: "Lili es la asistente virtual de RestoAI / La Cacerola. Atiende a los clientes desde el chat, responde consultas frecuentes, ayuda a revisar menú, pedidos, reservas, sucursales y reclamos, y permite que el equipo humano intervenga cuando sea necesario."
        },
        {
            keywords: ["pedido", "pedidos", "domicilio", "recoger", "estado"],
            answer: "RestoAI organiza pedidos que llegan desde el chat y desde el Punto de Venta. El equipo puede confirmarlos, prepararlos, marcarlos como listos, despacharlos, entregarlos, cobrarlos o cancelar/reimprimir comprobantes según el flujo del restaurante."
        },
        {
            keywords: ["reserva", "reservas", "mesa", "mesas"],
            answer: "El sistema permite gestionar reservas y mesas desde el panel. El restaurante puede asignar mesas, controlar estados de reserva y configurar la duración de reservas por sucursal."
        },
        {
            keywords: ["menu", "menú", "producto", "productos", "categoria", "categoría"],
            answer: "El módulo de menú permite administrar productos, categorías, precios, disponibilidad, imágenes, alérgenos y tiempos de preparación. Lili puede usar esa información para orientar al cliente en el chat."
        },
        {
            keywords: ["sucursal", "sucursales", "horario", "horarios", "zona", "envio", "envío"],
            answer: "RestoAI permite configurar sucursales con datos como teléfono, dirección, servicios, domicilio, zona de entrega, costo de envío, pedido mínimo y radio de cobertura. También permite manejar precios o disponibilidad diferente por sucursal."
        },
        {
            keywords: ["facturacion", "facturación", "fiscal", "cai", "ticket", "comprobante"],
            answer: "En facturación, RestoAI permite configurar datos fiscales y autorizaciones CAI por caja. Si no hay CAI vigente, la base de conocimiento indica que el sistema puede emitir ticket no fiscal."
        },
        {
            keywords: ["cliente", "clientes", "lealtad", "puntos"],
            answer: "El módulo de clientes ayuda a consultar información de clientes, teléfonos, correos, nivel de lealtad, historial de pedidos y puntos. Esto le da al restaurante más visibilidad para dar seguimiento y mejorar la experiencia."
        },
        {
            keywords: ["reclamo", "reclamos", "queja", "quejas", "problema"],
            answer: "RestoAI permite registrar y dar seguimiento a reclamos de clientes con estados como abierto, en progreso, resuelto y cerrado. Esto ayuda a que las quejas no queden dispersas o sin control."
        },
        {
            keywords: ["monitor", "humano", "intervenir", "supervisar"],
            answer: "El Monitor de Chat permite supervisar las conversaciones de Lili. Una persona del equipo puede tomar control, responder directamente al cliente y luego devolver la conversación al bot."
        },
        {
            keywords: ["sentimiento", "alerta", "alertas", "molesto", "insatisfecho"],
            answer: "Las alertas de sentimiento ayudan a detectar clientes molestos o insatisfechos dentro del chat, para que el personal pueda intervenir a tiempo antes de que el problema crezca."
        },
        {
            keywords: ["analitica", "analítica", "analiticas", "analíticas", "reporte", "reportes", "estadistica", "estadística"],
            answer: "Las analíticas de RestoAI muestran reportes y estadísticas sobre ventas, pedidos, comportamiento de clientes y tendencias. La idea es convertir la operación diaria en información útil para decidir mejor."
        },
        {
            keywords: ["beneficio", "beneficios", "valor", "problema", "resuelve"],
            answer: "RestoAI ayuda a atender más rápido, reducir procesos manuales, centralizar información, ordenar pedidos, mejorar reservas, controlar reclamos y tomar mejores decisiones con reportes. Comercialmente, no es solo un chatbot: combina atención con Lili y un panel operativo para el restaurante."
        },
        {
            keywords: ["demo", "contacto", "comercial", "interes", "interés"],
            answer: "¿Te gustaría agendar una demo para revisar cómo RestoAI podría adaptarse a tu restaurante?"
        }
    ];

    // Intenta cargar la base real. En local puede fallar por permisos del navegador, por eso existe el respaldo.
    fetch("base-conocimiento-restoai.txt")
        .then((response) => response.ok ? response.text() : "")
        .then((text) => {
            if (text.trim()) {
                knowledgeBase = text;
            }
        })
        .catch(() => {
            // El respaldo mantiene funcional el agente cuando se abre index.html directamente.
        });

    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function hasAnyKeyword(text, keywords) {
        return keywords.some((keyword) => text.includes(normalizeText(keyword)));
    }

    function createMessage(text, type) {
        const message = document.createElement("div");
        message.className = `restoai-message restoai-message-${type}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function buildAnswer(question) {
        const normalizedQuestion = normalizeText(question);
        const normalizedKnowledge = normalizeText(knowledgeBase);

        // Regla prioritaria: nunca revelar accesos, credenciales ni datos internos.
        if (hasAnyKeyword(normalizedQuestion, sensitiveAccessKeywords)) {
            return sensitiveAccessAnswer;
        }

        if (hasAnyKeyword(normalizedQuestion, demoAccessKeywords)) {
            return demoAccessAnswer;
        }

        if (hasAnyKeyword(normalizedQuestion, commercialKeywords)) {
            return commercialAnswer;
        }

        if (!hasAnyKeyword(normalizedQuestion, allowedKeywords)) {
            return restrictedAnswer;
        }

        const matchedTopic = answerBank.find((topic) => hasAnyKeyword(normalizedQuestion, topic.keywords));

        if (matchedTopic) {
            return matchedTopic.answer;
        }

        if (normalizedKnowledge.includes("restoai")) {
            return "RestoAI / La Cacerola es un sistema para restaurantes que combina un panel administrativo con Lili, una asistente virtual para clientes. Ayuda a centralizar pedidos, reservas, menú, sucursales, clientes, reclamos, monitor de chat, alertas de sentimiento y analíticas para mejorar la atención y ordenar la operación diaria.";
        }

        return restrictedAnswer;
    }

    function openChat() {
        widget.classList.add("is-open");
        toggleButton.classList.add("hidden");
        toggleButton.setAttribute("aria-expanded", "true");
        input.focus();
    }

    function closeChat() {
        widget.classList.remove("is-open");
        toggleButton.classList.remove("hidden");
        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.focus();
    }

    toggleButton.addEventListener("click", () => {
        if (widget.classList.contains("is-open")) {
            closeChat();
        } else {
            openChat();
        }
    });

    closeButton.addEventListener("click", closeChat);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const question = input.value.trim();

        if (!question) {
            return;
        }

        createMessage(question, "user");
        input.value = "";

        window.setTimeout(() => {
            createMessage(buildAnswer(question), "bot");
        }, 250);
    });
});
