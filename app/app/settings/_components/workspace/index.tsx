'use client'
import styles from '../settings.module.css'
import demoData from '@/constants/json/demo-data.json'
import CardBasic from '@/components/@core/cards/cardBasic'
import StackedListBasic from '@/components/@core/lists/stackedListBasic'
import StackedListBasicItem from '@/components/@core/lists/stackedListBasicItem'
import { ChangeEvent } from 'react'

export default function SettingsWorkspace() {

	const clearWorkspace = () => {
		localStorage.setItem('persist:root', '')
		window.location.href = '/app/dashboard'
	}

	const handleLoadDemoData = () => {
		localStorage.setItem('persist:root', JSON.stringify(demoData))
		window.location.href = '/app/dashboard'
	}

	const exportWorkspace = () => {
		const data = localStorage.getItem('persist:root')
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
		const link = document.createElement("a")
		link.href = jsonString
		link.download = "ContractCapitan-workspace.json"
		link.click()
	}

	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const fileReader = new FileReader()
		fileReader.readAsText(e.target.files[0], "UTF-8")
		fileReader.onload = (ev: ProgressEvent<FileReader>) => {
			if (!ev?.target?.result) return
			localStorage.setItem('persist:root', JSON.parse(ev.target.result.toString()))
			window.location.href = '/app/dashboard'
		}
	}

	return (
		<CardBasic title={'Workspace'} subtitle={'Manage the application projects and contracts workspace'}>
			<StackedListBasic>
				<StackedListBasicItem title={'Export and save your workspace'}>
					<button className={styles.listItemAction} onClick={() => exportWorkspace()}>
						Export
					</button>
				</StackedListBasicItem>
				<StackedListBasicItem title={'Import your workspace from a file'}>
					<label htmlFor="upload-json" className={styles.listItemAction}>Import</label>
					<input type="file" name="workspace-json" id="upload-json" className="opacity-0 absolute -z-10" accept=".json" onChange={(e) => handleFileUpload(e)} />
				</StackedListBasicItem>
				<StackedListBasicItem title={'Delete all projects and contracts'}>
					<button className={styles.listItemAction} onClick={() => clearWorkspace()}>
						Clear
					</button>
				</StackedListBasicItem>
				<StackedListBasicItem title={'Load demo projects and smart contracts'}>
					<button className={styles.listItemAction} onClick={() => handleLoadDemoData()}>
						Load
					</button>
				</StackedListBasicItem>
				<StackedListBasicItem title={'Sync workspace using Gist'}>
					<></>
				</StackedListBasicItem>
			</StackedListBasic>
		</CardBasic>
	)
}