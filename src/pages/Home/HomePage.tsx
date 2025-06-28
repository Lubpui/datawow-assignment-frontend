import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreatePostModal from "./components/CreatePostModal";
import { useAppDispatch } from "../../store/store";
import type { DynamicPostQuery, PostData } from "../../types/post.type";
import { getDynamicPosts } from "../../store/slices/post.slice";
import LoadingProgressCircle from "../../shared/LoadingProgressCircle";
import PostCardItem from "./components/PostCardItem";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { COMMUNITIES } from "../../constants/post.constants";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import debounce from "lodash.debounce";
import WarningLoginModal from "../../shared/WarningLoginModal";
import Cookies from "js-cookie";
import { cookieConstants } from "../../constants/localStorage.constants";

interface HomePageProps {
  username?: string;
}

const HomePage: React.FC<HomePageProps> = ({ username }) => {
  const dispath = useAppDispatch();

  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData>();
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");

  const isOurBlog = Boolean(username);

  const [searchTerm, setSearchTerm] = useState("");

  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  const token = Cookies.get(cookieConstants.TOKEN_KEY);

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openWarningLoginModal, setOpenWarningLoginModal] =
    useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (community?: string) => {
    setAnchorEl(null);
    setSelectedCommunity(community || "all");
  };

  const fetchPosts = useCallback(async () => {
    try {
      setFetchLoading(true);
      const query: DynamicPostQuery = {
        mode: "all",
        community: selectedCommunity,
        term: searchTerm.length >= 2 ? searchTerm : "",
      };

      if (isOurBlog) {
        query.mode = "user";
        query.username = username;
      }

      const { data: postRes = [] } = await dispath(
        getDynamicPosts(query)
      ).unwrap();

      setPosts(postRes);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  }, [dispath, isOurBlog, searchTerm, selectedCommunity, username]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const debouncedCallback = debounce((value) => {
    setSearchTerm(value);
  }, 500);

  const renderFilter = useMemo(() => {
    return (
      <Box className="flex min-[800px]:gap-4 items-center">
        {!mobileMatches || isSearch ? (
          <TextField
            className="w-full flex-1"
            variant="outlined"
            placeholder="Search"
            onChange={(e) => {
              debouncedCallback(e.target.value);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                borderRadius: "8px",
                height: "40px",
                "& fieldset": {
                  borderColor: "#D8E9E4",
                },
                "&:hover fieldset": {
                  borderColor: "#D8E9E4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D8E9E4",
                },
              },
            }}
          />
        ) : (
          <Box className="w-full pl-2 flex-1 flex items-center">
            <IconButton onClick={() => setIsSearch(true)}>
              <Search />
            </IconButton>
          </Box>
        )}

        {isSearch ? (
          <IconButton onClick={() => setIsSearch(false)}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        ) : (
          <>
            <Button
              sx={{
                "& .MuiButtonBase-root": {
                  height: "40px",
                  textTransform: "none",
                },
              }}
              onClick={handleClick}
              className=""
            >
              <Typography className="normal-case text-[#191919]">
                Community
              </Typography>
              <KeyboardArrowDownIcon className="text-[#191919]" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose()}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #e0e0e0",
                  minWidth: "200px",
                  marginTop: "4px",
                },
                "& .MuiList-root": {
                  padding: "8px 0",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                value={"all"}
                selected={selectedCommunity === "all"}
                onClick={() => handleClose("all")}
                sx={{
                  minWidth: "200px",
                  height: "44px",
                  fontSize: "16px",
                  color: "#191919",
                  backgroundColor:
                    selectedCommunity === "all" ? "#e8f5e8" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedCommunity === "all" ? "#e8f5e8" : "#f5f5f5",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#e8f5e8",
                    "&:hover": {
                      backgroundColor: "#e8f5e8",
                    },
                  },
                }}
              >
                All
                {selectedCommunity === "all" && (
                  <CheckRoundedIcon className="ml-auto text-[#4caf50]" />
                )}
              </MenuItem>
              {COMMUNITIES.map((community, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={community}
                    selected={selectedCommunity === community}
                    onClick={() => handleClose(community)}
                    sx={{
                      minWidth: "200px",
                      height: "44px",
                      fontSize: "16px",
                      color: "#191919",
                      backgroundColor:
                        selectedCommunity === community
                          ? "#e8f5e8"
                          : "transparent",
                      "&:hover": {
                        backgroundColor:
                          selectedCommunity === community
                            ? "#e8f5e8"
                            : "#f5f5f5",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#e8f5e8",
                        "&:hover": {
                          backgroundColor: "#e8f5e8",
                        },
                      },
                    }}
                  >
                    {community}
                    {selectedCommunity === community && (
                      <CheckRoundedIcon className="ml-auto text-[#4caf50]" />
                    )}
                  </MenuItem>
                );
              })}
            </Menu>

            <Button
              color="success"
              className="h-[40px] normal-case"
              variant="contained"
              sx={{
                backgroundColor: "#49A569",
                boxShadow: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#3d8a57",
                  boxShadow: "none",
                },
              }}
              onClick={() => {
                if (!token) {
                  setOpenWarningLoginModal(true);
                  return;
                }

                setOpenModal(true);
              }}
            >
              <Typography className="text-white text-[14px] font-semibold normal-case">
                Create +
              </Typography>
            </Button>
          </>
        )}
      </Box>
    );
  }, [
    anchorEl,
    debouncedCallback,
    isSearch,
    mobileMatches,
    open,
    selectedCommunity,
    token,
  ]);

  const renderContent = useMemo(() => {
    return (
      <Box className="w-full h-[calc(100vh-64px-40px)] pb-8 overflow-auto">
        {posts.map((post, index) => {
          return (
            <PostCardItem
              post={post}
              index={index}
              totalPosts={posts.length}
              searchTerm={searchTerm}
              isOurBlog={isOurBlog}
              onClickEdit={(post: PostData) => {
                setSelectedPost(post);
                setOpenModal(true);
              }}
              callbackPost={() => {
                fetchPosts();
              }}
            />
          );
        })}
      </Box>
    );
  }, [posts, searchTerm, isOurBlog, fetchPosts]);

  return (
    <>
      <Box className="bg-[#BBC2C0] h-[calc(100vh-64px)] pt-10 flex justify-center w-full">
        <Box className="max-w-[798px] w-full flex flex-col gap-6 min-[800px]:gap-8 px-4">
          {renderFilter}

          {renderContent}
        </Box>
      </Box>

      <CreatePostModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedPost(undefined);
        }}
        callbackSubmit={() => {
          fetchPosts();
        }}
        selectedPost={selectedPost}
      />

      <WarningLoginModal
        open={openWarningLoginModal}
        onClose={() => setOpenWarningLoginModal(false)}
      />

      <LoadingProgressCircle status={fetchLoading} />
    </>
  );
};

export default HomePage;
