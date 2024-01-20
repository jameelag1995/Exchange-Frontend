import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { axiosProductsInstance } from "../../utils/utils";

export default function Search({ setDisplayedProducts, setMsg }) {
    const searchRef = useRef();
    const { accessToken } = useAuth();
    const handleSearch = async () => {
        if (accessToken) {
            try {
                const searchQuery = searchRef.current.value;
                const result = await axiosProductsInstance.get(`/search/by`, {
                    params: {
                        searchQuery,
                    },
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
                if (result.data.length === 0) {
                    setMsg({
                        title: "No Products were found!",
                        message: "No Products contain the search word you used",
                    });
                }
                setDisplayedProducts(result.data);
            } catch (error) {
                setMsg(error.response.data);
            }
        }
    };
    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 400,
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search For Products"
                inputProps={{ "aria-label": "search for products" }}
                inputRef={searchRef}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                onClick={handleSearch}
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
