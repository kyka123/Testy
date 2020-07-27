//Yes, It's probably factory function.
exports.clientTemplate = (name, email, points) => ({
    from: `Krzysztof Kasprzyk <${process.env.EMAIL}>`,
    to: email,
    subject: `Wyniki z testów`,
    html: `Cześć, ${name}, dzięki za udział.<br/>
                   Oto twój wynik: ${points} punktów, całkiem nieźle.<br/>
                   W razie pytań proszę pisać na ten email.<br/>
                   Pozdrawiam, Krzysztof Kasprzyk
            `,
})
