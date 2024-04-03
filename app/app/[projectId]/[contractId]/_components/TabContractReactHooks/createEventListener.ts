interface Props {
	method: any
}

export default function createEventListener({method}: Props) {

    const capitalize = (e: string) => {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    const getParams = () => {
        let params: any[] = []
        method.inputs.forEach((i: { name: any }) => {
            params.push(i.name)
        })
        return params.join(', ')
    }

    return (`
export const use${capitalize(method.name)} = () => {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const listenTo${capitalize(method.name)} = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner() 
            const _contract = new ethers.Contract(address, abi, signer)
            _contract.on(${`${method.name}`}, (${getParams()}, event) => {
                setData(event)
            })
        } catch (error) {
            setError([error])
            return null
        }
    }

    return {
        listenTo${capitalize(method.name)},
        event${capitalize(method.name)}Data: data
        event${capitalize(method.name)}Error: error
    }
}


`
    )
}