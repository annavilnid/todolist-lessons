import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTheme, ThemeProvider} from '@mui/material/styles';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    // const theme = createTheme({
    //     spacing: 10,
    //     palette: {
    //         primary: {
    //             main: '#ba68c8',
    //             contrastText: "#808080",
    //         },
    //         secondary: {
    //             main: '#4caf50',
    //             contrastText: "#808080",
    //         },
    //     },
    // });

    const buttonStyle: any= {
        padding: "0",
        marginLeft: "7px",
        minWidth: "22px",
        maxWidth: "22px",
        width: "22px",
        height: "22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    }


    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }



    return <div style={{display: "flex", flexDirection: "row"}}>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <Box
          component="form"
          sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
            <TextField id="outlined-basic"
                       value={title}
                       label={error ? error : "Please type here..."}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
        </Box>
        {/*<ThemeProvider theme={theme}>*/}
          <Button variant="outlined" color="primary" style={buttonStyle} onClick={addItem}>+</Button>
        {/*</ThemeProvider>*/}
        {/*<button onClick={addItem}>+</button>*/}

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
