import { useAppSelector } from '@/store/store'
import { IContract } from '@/types/projects'
import { shortenAddress } from '@/utils/common'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { formatEther } from 'viem'
import { useConfig } from 'wagmi'

let networks: any[] = []

function getExplorerLink(val: any) {
  const network = networks.find(n => n.id === val)
  return network?.blockExplorers?.default?.url
}

const columns: any[] = [
  {
    name: 'Time',
    selector: (row: any) => new Date(row.timestamp.toString()).toLocaleString("en-EN"),
    sortable: true
  },
  {
    name: 'Network',
    selector: (row: any) => row.network,
    sortable: true
  },
  {
    name: 'Txn Hash',
    selector: (row: any) => <a href={`${getExplorerLink(row.chainId)}/tx/${row.txHash}`} target="_blank" rel="noreferrer">{shortenAddress(row.hash, 3, 2)}</a>,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'Block Number',
    selector: (row: any) => <a href={`${getExplorerLink(row.chainId)}/block/${row.blockNumber.toString()}`} target="_blank" rel="noreferrer">{row.blockNumber}</a>,
    sortable: true,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'From',
    selector: (row: any) => <a href={`${getExplorerLink(row.chainId)}/address/${row.from}`} target="_blank" rel="noreferrer">{shortenAddress(row.from, 3, 2)}</a>,
    sortable: true,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'To',
    selector: (row: any) => <a href={`${getExplorerLink(row.chainId)}/address/${row.to}`} target="_blank" rel="noreferrer">{shortenAddress(row.to, 3, 2)}</a>,
    sortable: true,
    style: {
      '&:hover': {
        color: '#4f46e5',
        textDecoration: 'underline'
      }
    }
  },
  {
    name: 'Gas Price',
    selector: (row: any) => formatEther(row.gasPrice)
  },
  {
    name: 'Value',
    selector: (row: any) => formatEther(row.value)
  }
]

const paginationOptions = {
  noRowsPerPage: false,
  selectAllRowsItem: true
}

export default function GridTransactions({ contract }: { contract: IContract}) {
  const { chains } = useConfig()
  const contractTransactions = useAppSelector((state) => state.transactions.find(c => c.contractId === contract?.id))
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    networks = chains.slice()
  }, [chains])

  useEffect(() => {
    if (contractTransactions) {
      setData(contractTransactions?.transactions)
    } else {
      setData([])
    }
  }, [contractTransactions])

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