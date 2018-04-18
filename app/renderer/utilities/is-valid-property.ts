const pattern = /^--\S+$/

const isValidProperty = (property: string) => pattern.test(property)

export default isValidProperty
