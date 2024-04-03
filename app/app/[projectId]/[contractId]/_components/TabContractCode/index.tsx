import { useEffect, useState } from 'react'
import { IContract } from '@/types/projects'
import Editor from '@monaco-editor/react'

interface Props {
  contract: IContract
  editorOptions: any
}

export default function TabContractCode({ contract, editorOptions }: Props) {
  const [code, setCode] = useState('')

  useEffect(() => {
    setCode('')
  }, [])

  useEffect(() => {
    if (contract && contract?.code) {
      setCode('')
      setCode(contract.code)
    }
  }, [contract])

  return (
    <Editor
      height="79vh"
      theme="vs-dark"
      defaultLanguage="sol"
      value={code}
      options={editorOptions}
    />
  )
}
