'use client'

export default function PageContract({ params }: { params: { projectId: string, contractId: string } }) {
  return (
    <>
      <h1>Contract</h1>
      <p>Project ID: {params.projectId}</p>
      <p>Contract ID: {params.contractId}</p>
    </>
  )
}