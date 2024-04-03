import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useConfig } from 'wagmi'
import { IContract } from '@/types/projects'
import { shortenAddress } from '@/utils/common'
import { useAppSelector } from '@/store/store'

let networks: any[] = []

function getExplorerLink(val: any) {
  const network = networks.find(n => n.id === val)
  return network?.blockExplorers?.default?.url
}

const columns: any[] = [
  {
    name: 'Time',
    selector: (row: any) => new Date(row.timestamp).toLocaleString("en-EN"),
    sortable: true
  },
  {
    name: 'Network',
    selector: (row: any) => row.network,
    sortable: true
  },
  {
    name: 'Block',
    selector: (row: any) => row.event.blockNumber
  },
  {
    name: 'Event',
    selector: (row: any) => row.event.event,
    sortable: true,
  },
  {
    name: 'Txn Hash',
    selector: (row: any) => <a href={`${getExplorerLink(row.chainId)}/tx/${row.event.transactionHash}`} target="_blank" rel="noreferrer">{shortenAddress(row.event.transactionHash, 8, 2)}</a>,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  }
]

const paginationOptions = {
  noRowsPerPage: false,
  selectAllRowsItem: true
}

export const GridEvents = ({ contract }: { contract: IContract}) => {
  const { chains } = useConfig()
  const contractEvents = useAppSelector((state) => state.events.find(c => c.contractId === contract?.id))
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    networks = chains.slice()
  }, [chains])

  useEffect(() => {
    if (contractEvents) {
      setData(contractEvents?.events)
    } else {
      setData([])
    }
  }, [contractEvents])

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginationOptions}
      />
    </div>
  )
}
