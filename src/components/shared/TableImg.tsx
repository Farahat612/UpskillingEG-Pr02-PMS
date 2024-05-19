import nodataImg from '../../assets/images/no-data.png'
import { staticURL } from '../../utils/api'

interface TableImgProps {
  path?: string
  altTxt: string
  fit?: 'contain' | 'cover'
}

const TableImg = ({ path, altTxt, fit }: TableImgProps) => {
  return (
    <img
      src={path ? `${staticURL}/${path}` : nodataImg}
      alt={path ? altTxt : 'No Data Available'}
      className='img-fluid '
      style={{
        width: '70px',
        height: '40px',
        objectFit: fit || 'contain',
      }}
    />
  )
}

export default TableImg
