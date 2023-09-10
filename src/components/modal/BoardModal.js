import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material'
import TitleField from './TitleField'
import { SaveButton } from './SaveButton'

const BoardModal = ({
    board,
    openModal,
    handleCloseModel,
    handleUpdateBoard,
    handleCreateBoard,
    mode,
}) => {
    const [name, setName] = useState(board ? board.name : '')

    const handleSubmit = (event) => {
        event.preventDefault();

        if (board) {
            const updatedBoard = { ...board, name: name }
            handleUpdateBoard(updatedBoard)
        } else {
            const newBoard = { name: name }
            handleCreateBoard(newBoard)
            setName('')
        }
        handleCloseModel()
    }
    return (
        <Modal
            className='modal'
            open={openModal}
            onClose={handleCloseModel}
            aria-labelled='modal-edit-board'
            aria-describedby='modal-edit-board-name'>
            <div
                className='modal-body edit-modal b-radius'
                style={{ background: !mode ? '#212121' : '#fff' }}>
                    <Typography
                        id='modal-modal-title'
                        variant='h5'
                        component='h3'
                        gutterBottom>
                            Board Details
                        </Typography>

                    <form
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        className='form details-form'>
                            <TitleField title={name} setTitle={setName} labelName='Board Name' />
                            <SaveButton title={board ? 'Save Board' : 'Create Board'} />
                    </form>
                </div>
                </Modal>
    )
}
export default BoardModal