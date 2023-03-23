import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import styles from './TokenInput.module.scss'
import classNames from '../../../util/classNames'
const TokenInput = ({
  placeholder,
  className,
  isInvalid,
  onChange,
  value
}: {
  placeholder: string
  className: string
  isInvalid: boolean
  onChange: (e: any) => void
  value: string
}): JSX.Element => {
  const [showToken, setShowToken] = useState(false)

  return (
    <div className={styles.container}>
      <Form.Control
        placeholder={placeholder}
        className={classNames(styles.input, className)}
        isInvalid={isInvalid}
        onChange={onChange}
        value={value}
        type={showToken ? 'text' : 'password'}
      />
      <FontAwesomeIcon
        icon={showToken ? faEye : faEyeSlash}
        onClick={() => {
          setShowToken((old) => !old)
        }}
        className={styles.icon}
        color="gray"
        width={20}
      />
    </div>
  )
}

export default TokenInput
