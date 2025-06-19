export function convertToReal(value?: number) {
    const realValue = value && value / 100

    return realValue?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}