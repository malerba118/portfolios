const defaultDataHandler = ({ data, res }) => {
    res.status(200)
    res.json(data)
}

const defaultErrorHandler = ({ error, res }) => {
    console.log(error)
    res.status(500)
    res.json(error)
}

const router = (
    handlers, 
    { 
        onData = defaultDataHandler, 
        onError = defaultErrorHandler
    } = {}
) => {
    return async (req, res) => {
        let handler
        if (req.method === 'GET') {
            handler = handlers.get
        }
        else if (req.method === 'POST') {
            handler = handlers.post
        }
        else if (req.method === 'PUT') {
            handler = handlers.put
        }
        else if (req.method === 'PATCH') {
            handler = handlers.patch
        }
        else if (req.method === 'DELETE') {
            handler = handlers.delete
        }
        if (typeof handler === 'function') {
            try {
                const data = await handler(req, res)
                onData({ data, res, req })
            }
            catch(error) {
                onError({ error, res, req })
            }
        }
        else {
            const allowedMethods = Object.keys(handlers).map(methodName => methodName.toUpperCase())
            res.setHeader('Allow', allowedMethods.join(', '))
            res.status(405).end('Method Not Allowed')
        }
    }
}

export default router