// import SettingsGeneral from './_components/general'
import SettingsProviders from './_components/providers'
import SettingsWorkspace from './_components/workspace'


export default function PageSettings() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="py-4">
        {/* <SettingsGeneral /> */}
        <SettingsProviders />
        <SettingsWorkspace />
      </div>
    </>
  )
}
