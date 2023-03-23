import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'common/util/classNames'
import { useMutation } from 'react-query'
import { patchQuery } from 'api/API'
import { SET_EDIT_MODAL_OPEN, SET_DATA, SET_EDIT_ERROR } from '../../slices/usersSlice'

import styles from './EditModal.module.scss'
const EditModal = ({ show, onSuccess }: { show: boolean; onSuccess: () => void }): JSX.Element => {
  const dispatch = useDispatch()
  const { mutateAsync, isLoading } = useMutation(
    async () => await patchQuery(`users/${id as number}`, { name, email, gender, status })
  )

  const { id, name, email, gender, status, editError } = useSelector((state: any) => state.users)

  const close = (): void => {
    dispatch(SET_EDIT_ERROR(''))
    dispatch(SET_EDIT_MODAL_OPEN(false))
  }

  const handleEdit = (): void => {
    mutateAsync()
      .then((res) => {
        console.log('RES', res)
        if (res.status === 200) {
          onSuccess()
          close()
        } else if (res.status === 422) {
          // dataDispatch({
          //   type: 'SET_ERROR',
          //   payload: res.json()
          // })
          res.json().then((err) => {
            const field = err[0].field as string
            dispatch(
              SET_EDIT_ERROR(
                `${field.charAt(0).toUpperCase() + field.slice(1)} ${err[0].message as string}`
              )
            )
          })
        }
      })
      .catch((e) => {
        console.log('TEST ', e)
      })
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column space-y-4">
          <div className="d-flex justify-content-between">
            <span className="text-sm">Name :</span>
            <input
              type="text"
              value={name}
              className={styles.input}
              onChange={(e) => {
                dispatch(
                  SET_DATA({
                    name: 'name',
                    value: e.target.value
                  })
                )
              }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-sm">Email :</span>
            <input
              type="text"
              value={email}
              className={styles.input}
              onChange={(e) => {
                dispatch(
                  SET_DATA({
                    name: 'email',
                    value: e.target.value
                  })
                )
              }}
            />
          </div>{' '}
          <div className="d-flex justify-content-between">
            <span className="text-sm">Gender :</span>
            <select
              value={gender}
              className={classNames(styles.input, styles.select)}
              onChange={(e) => {
                dispatch(
                  SET_DATA({
                    name: 'gender',
                    value: e.target.value
                  })
                )
              }}>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </select>
          </div>{' '}
          <div className="d-flex justify-content-between">
            <span className="text-sm">Status :</span>
            <select
              value={status}
              className={classNames(styles.input, styles.select)}
              onChange={(e) => {
                dispatch(
                  SET_DATA({
                    name: 'status',
                    value: e.target.value
                  })
                )
              }}>
              <option value={'active'}>Active</option>
              <option value={'inactive'}>Inactive</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex w-100 space-x-4">
          <Button variant="danger" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Edit'}
          </Button>
        </div>
        {editError != null && <div className="text-danger">{editError}</div>}
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
