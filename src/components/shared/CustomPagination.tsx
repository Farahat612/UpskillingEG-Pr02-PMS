import { Pagination } from 'react-bootstrap'

interface CustomPaginationProps {
  pageNumber: number
  pageSize: number
  totalNumberOfRecords: number
  setPagination: (pageNumber: number, pageSize: number) => void
}

const CustomPagination = ({
  pageNumber,
  pageSize,
  setPagination,
  totalNumberOfRecords,
}: CustomPaginationProps) => {
  // Logic for handling pagination
  const handleNextPage = () => {
    setPagination(pageNumber + 1, pageSize)
  }
  const handlePreviousPage = () => {
    setPagination(pageNumber - 1, pageSize)
  }
  const totalPages = Math.ceil(totalNumberOfRecords / pageSize)
  const currentPage = pageNumber

  // Return the Pagination component
  return (
    <Pagination className='d-flex justify-content-start '>
      <Pagination.First
        onClick={() => setPagination(1, pageSize)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      />
      {totalPages > 0 &&
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setPagination(page, pageSize)}
          >
            {page}
          </Pagination.Item>
        ))}
      <Pagination.Next
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => setPagination(totalPages, pageSize)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default CustomPagination
