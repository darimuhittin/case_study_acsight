/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Card } from 'react-bootstrap'

import type { UserType } from '../../../types/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faMale, faFemale, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  SET_EDIT_MODAL_OPEN,
  SET_DELETE_MODAL_OPEN,
  SET_USER_DATA_ALL
} from '../../../../features/Users/slices/usersSlice'

import classNames from 'common/util/classNames'
import styles from './UserCard.module.scss'

const UserCard = ({ user }: { user: UserType }): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const setUserData = (): void => {
    dispatch(SET_USER_DATA_ALL(user))
  }
  const showUserEditModal = (): void => {
    setUserData()
    dispatch(SET_EDIT_MODAL_OPEN(true))
  }
  const showUserDeleteModal = (): void => {
    setUserData()
    dispatch(SET_DELETE_MODAL_OPEN(true))
  }

  const goDetails = (): void => {
    navigate(`/users/${user.id}/todos`)
  }
  return (
    <Card className={styles.container}>
      {/* <Card.Img
        variant="top"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
      /> */}
      <Card.Body>
        {/* Image is generated from email address tolower and trim */}
        <div className="d-flex justtify-content-between">
          <img
            src={`https://i.pravatar.cc/64?u=${user.email as string}`}
            className={styles.image}
          />
          <div className="d-flex w-100 justify-content-end align-items-start">
            <div
              className={classNames(
                'd-flex align-items-center justify-content-between',
                styles.status_container
              )}>
              <span className={styles.bold}>Status :</span>

              <div
                className={classNames(user.status === 'active' ? styles.active : styles.inactive)}
              />
              <span className={styles.status_result}>
                {user.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.data_container}>
          <div className={styles.deneme}>
            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>ID :</span>
              <span>{user.id}</span>
            </div>

            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Name :</span>
              <span>{user.name}</span>
            </div>

            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Email :</span>
              <span className={styles.email_field}>{user.email}</span>
            </div>

            <div className={styles.data_field}>
              <span className={classNames(styles.bold, styles.data_field__caption)}>Gender :</span>
              <div>
                <span>{user.gender === 'male' ? 'MALE' : 'FEMALE'}</span>
                <FontAwesomeIcon
                  icon={user.gender === 'male' ? faMale : faFemale}
                  fontSize={14}
                  className={styles.gender}
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column w-100 align-items-end justify-content-end">
            <div className="d-flex align-items-end justify-content-end">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className={styles.details}
                size={'2x'}
                onClick={goDetails}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.edit}
                style={{ marginLeft: '10px' }}
                size={'2x'}
                onClick={showUserEditModal}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.delete}
                size={'2x'}
                style={{ marginLeft: '10px' }}
                onClick={showUserDeleteModal}
              />
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default UserCard
