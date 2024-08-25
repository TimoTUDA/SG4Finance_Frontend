import * as React from "react";
import Drawer from '@mui/material/Drawer';
import { Box, Button } from "@mui/material";
import "../../styles/Glossary.css";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

export default function Glossary() {
    const [open, setOpen] = React.useState<boolean>(false);
    //load terms from file
    const terms = require('../data/glossary.json');

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setOpen(open);
        };

    const termsPrint =
        <dl>
            {terms.map((entry) => <div key={entry.term}>
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
            </div>)
            }
        </dl>

    const termsBox = <Box
        className="colors"
        sx={{ width: 500 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
        {termsPrint}
    </Box>

    return (
        <div>
            <Button id="toggle-glossary"
                className="btn-glossary"
                onClick={toggleDrawer(true)}
                color="primary"
                variant="outlined"
            >
                <MenuBookRoundedIcon />
                <span className="size-glossar-btn">GLOSSAR</span>
            </Button>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}

            >
                {/*    glossary map here */}
                {termsBox}
            </Drawer>
        </div>
    )

}
