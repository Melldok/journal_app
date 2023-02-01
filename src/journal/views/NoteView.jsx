import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components/ImageGallery"

export const NoteView = () => {

    const dispatch = useDispatch();

    // Select the active note from store
    const {active:note, messageSaved, isSaving} = useSelector(state => state.journal)

    const {body, title, date,  onInputChange, formState} = useForm(note)

    const dateString= useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString()

    }, [date])

    // This useRef will mantain the reference to our HTML element even if its invisible, so we can use the file input but hide it because of its ugliness 

    const fileInputRef = useRef();


    useEffect(() => {
      dispatch(setActiveNote(formState))
    }, [formState])
    

    const onSaveNote = () => {
        dispatch(startSavingNote());
    }

    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('Note Updated', messageSaved, 'success')
        }
      },[messageSaved])
      

      const onFileInputChange = ({target}) => {
        if(target.files === 0) return;

        dispatch(startUploadingFiles(target.files))
        
      }


      const onDelete = () => {
        dispatch(startDeletingNote());
      }


  return (
    <Grid container
        className="animate__animated animate__fadeIn"
        direction='row' 
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 1 }} 
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
        </Grid>
        <Grid item>

            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{ display:'none' }}
            /> 

            <Button 
                disabled={isSaving}
                // this will simulate a click on the element
                onClick={() => fileInputRef.current.click()}
                color="primary" 
                sx={{ padding: 2}}
                
                >
                <UploadOutlined sx={{ fontSize: 30, mr: 1}} />
                Upload
            </Button>
            <Button 
                disabled={isSaving}
                onClick={onSaveNote}
                color="primary" 
                sx={{ padding: 2}}
                
                >
                <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                Save
            </Button>
        </Grid>

        <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder="Write a title"
                    label='Title'
                    sx={{border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    sx={{border: 'none', mb: 1}}
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls}/>
    </Grid>
  )
}


