'use client'
import styles from './page.module.css'
import { useEffect, useState } from "react"
import { Tab } from '@headlessui/react'
import { toast } from "react-hot-toast"
import { useAccount } from 'wagmi'
import { isAddress } from 'viem'
import { useMonaco } from "@monaco-editor/react"
import { useAppSelector } from '@/store/store'
import { IContract, IProject } from '@/types/projects'
import TabContractABI from "./_components/TabContractABI"
import TabContractCode from "./_components/TabContractCode"
import TabContractRead from "./_components/TabContractRead"
import TabContractWrite from "./_components/TabContractWrite"
import TabContractEvents from "./_components/TabContractEvents"
import ModalProjectSettings from '../_components/modalProjectSettings'
import TabContractTransactions from "./_components/TabContractTransactions"
// import TabContractReactHooks from './_components/TabContractReactHooks'
import { ArrowTopRightOnSquareIcon, ClipboardIcon, Cog8ToothIcon } from "@heroicons/react/24/outline"


const editorOptions = {
    scrollBeyondLastLine: false,
    readOnly: true,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    scrollbar: { verticalScrollbarSize: 0 }
}

export default function PageContract({ params }: { params: { projectId: string, contractId: string } }) {
    const monaco = useMonaco()
    const projects = useAppSelector((state) => state.projects)
    const { chain } = useAccount()
    const [project, setProject] = useState<IProject>()
    const [contract, setContract] = useState<IContract>()
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        if (params?.projectId && params?.contractId && projects) {
            const project = projects?.find(i => i.id === params.projectId)
            setProject(project)
            const contract = project?.contracts.find(i => i.id === params.contractId)
            setContract(contract)
        }
    }, [params, projects])

    useEffect(() => {
        if (monaco && monaco?.editor) {
            monaco.editor.defineTheme('myTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [{ background: '#1f2937' }],
                colors: { 'editor.background': '#1f2937' }
            })
            monaco.editor.setTheme('myTheme')
        }
    }, [monaco])

    const handleOpenInExplorer = () => {
        const explorerUrl = chain?.blockExplorers?.default?.url
        window.open(`${explorerUrl}/address/0x${contract?.address}`, '_blank')
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(`0x${contract?.address}` ?? '')
        toast.success('Copied to clipboard')
    }

    return (
        <>
            <div className="flex justify-between">
                <div>
                    {(contract?.name && !isAddress(`0x${contract?.name}`))
                        ?
                        <>
                            <h1 className="text-lg md:text-2xl font-semibold text-gray-900">{contract?.name}</h1>
                            <h2 className="text-sm md:text-lg font-semibold text-gray-500">{project?.name}</h2>
                        </>
                        :
                        <h1 className="text-lg md:text-2xl font-semibold text-gray-900">{project?.name}</h1>
                    }
                    <div className="flex items-center">
                        <h3 className="text-xs md:text-md font-semibold text-gray-500">{`0x${contract?.address}`}</h3>
                        <ClipboardIcon className="w-4 h-6 ml-2 cursor-pointer hover:text-indigo-600" onClick={handleCopyToClipboard} />
                        <ArrowTopRightOnSquareIcon className="w-4 h-6 ml-2 cursor-pointer hover:text-indigo-600" onClick={handleOpenInExplorer} />
                    </div>
                </div>
                <div className="pt-1">
                    <Cog8ToothIcon className="w-6 h-6 cursor-pointer hover:text-indigo-600" onClick={() => setOpen(true)} />
                </div>
            </div>

            <Tab.Group>
                <Tab.List className="border-b border-gray-200 pb-5 sm:pb-0 mt-3 -mb-px flex space-x-6 md:space-x-8 overflow-x-auto">
                    <Tab className={styles.tab}>Read</Tab>
                    <Tab className={styles.tab}>Write</Tab>
                    <Tab className={styles.tab}>Transactions</Tab>
                    <Tab className={styles.tab}>Events</Tab>
                    <Tab className={styles.tab}>ABI</Tab>
                    <Tab className={styles.tab}>Code</Tab>
                    {/* <Tab className={styles.tab}>React</Tab> */}
                </Tab.List>
                <Tab.Panels className="pt-4">
                    <Tab.Panel>
                        {project && contract && <TabContractRead chain={project?.chain} contract={contract} />}
                    </Tab.Panel>
                    <Tab.Panel>
                        {project && contract && <TabContractWrite chain={project?.chain} contract={contract} />}
                    </Tab.Panel>
                    <Tab.Panel>
                        {project && contract && <TabContractTransactions contract={contract} />}
                    </Tab.Panel>
                    <Tab.Panel>
                        {project && contract && <TabContractEvents contract={contract} />}
                    </Tab.Panel>
                    <Tab.Panel>
                        {project && contract && <TabContractABI contract={contract} editorOptions={editorOptions} />}
                    </Tab.Panel>
                    <Tab.Panel>
                        {project && contract && <TabContractCode contract={contract} editorOptions={editorOptions} />}
                    </Tab.Panel>
                    {/* <Tab.Panel>
                        {project && contract && <TabContractReactHooks contract={contract} editorOptions={editorOptions} />}
                    </Tab.Panel> */}
                </Tab.Panels>
            </Tab.Group>

            {project && contract && <ModalProjectSettings project={project} contract={contract} open={isOpen} onClose={() => setOpen(false)} />}
        </>
    )
}
