import { IContract } from '@/types/projects'
import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'


interface Props {
    contract: IContract
    editorOptions: any
}

export default function TabContractABI({ contract, editorOptions }: Props) {
    const [abi, setAbi] = useState('')

    useEffect(() => {
        if (contract && contract?.abi) {
            const a = JSON.stringify(JSON.parse(contract?.abi), null, 2)
            setAbi(a)
        }
    }, [contract])

    return (
        <Editor
            height="79vh"
            theme="vs-dark"
            defaultLanguage="json"
            value={abi}
            options={editorOptions}
        />
    )
}
