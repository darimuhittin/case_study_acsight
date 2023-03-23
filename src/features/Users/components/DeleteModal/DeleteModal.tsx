import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { deleteQuery } from 'api/API'
import { SET_DELETE_MODAL_OPEN, SET_DELETE_ERROR } from '../../slices/usersSlice'

const DeleteModal = ({
  show,
  onSuccess
}: {
  show: boolean
  onSuccess: () => void
}): JSX.Element => {
  const dispatch = useDispatch()
  const { mutateAsync, isLoading } = useMutation(
    async () => await deleteQuery(`users/${id as number}`)
  )

  const { id, name, email, gender, status, deleteError } = useSelector((state: any) => state.users)

  const close = (): void => {
    dispatch(SET_DELETE_ERROR(null))
    dispatch(SET_DELETE_MODAL_OPEN(false))
  }

  const handleEdit = (): void => {
    mutateAsync()
      .then((res) => {
        console.log('RES', res)
        if (res.status === 204) {
          onSuccess()
          close()
        } else {
          // dataDispatch({
          //   type: 'SET_ERROR',
          //   payload: res.json()
          // })
          res.json().then((err) => {
            const message = err.message as string
            dispatch(SET_DELETE_ERROR(`${message.charAt(0).toUpperCase() + message.slice(1)}`))
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
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column space-y-4">
          <div className="d-flex justify-content-between">
            <span>Name :</span>
            <span>{name}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Email :</span>
            <span>{email}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Gender :</span>
            <span>{gender}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Status :</span>
            <span>{status}</span>
          </div>
        </div>
        {/* DO YOU WANT TO DELETE THIS USER SECTION */}
        <div>
          <div className=" text-center mt-4">Do you want to delete this user?</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex w-100 space-x-4">
          <Button variant="danger" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Delete'}
          </Button>
        </div>
        {deleteError != null && <div className="text-danger">{deleteError}</div>}
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
