export function objToURLSearchParams<Params>(params: Params & Record<string, any>) {
  if (typeof params !== 'object') {
    throw new Error('Invalid params.')
  }

  const search = Object.keys(params).reduce((acc, key) => {
    acc[key] = params[key]

    return acc
  }, {} as Record<string, any>)

  return `?${new URLSearchParams(search)}`
}
