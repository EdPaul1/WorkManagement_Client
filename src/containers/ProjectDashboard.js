import * as React from 'react'
import { useParams } from 'react-router-dom'; // Import useParams
import { useEffect, useCallback, useState } from 'react'
import { ProjectColors } from '../helpers/ProjectColors'
import DropdownMenu from '../components/DropdownMenu'
import ProjectModal from '../components/modal/ProjectModal'
import Boards from './Boards'
import {
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Box,
  Container,
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

const ProjectDashboard = ({
  navigate,
  mode,
  handleUpdatingProject,
  handleDeleteProject,
}) => {
  const { id } = useParams(); // Get the 'id' parameter from the route

  const [project, setProject] = useState({});
  const [boards, setBoards] = useState([]);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchProject =  useEffect(() => {
    // Fetch project data when the component mounts
    fetch(`/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setBoards(data.boards);
      });
  }, [id]); // Use 'id' as a dependency to re-fetch data when the route changes

  const handleFavoringAProject = () => {
    const updatedProject = { ...project, favorite: !project.favorite };
    setProject(updatedProject);
    handleUpdatingProject(updatedProject);
  }

  const handleChange = (changedProject) => {
    setProject(changedProject);
    handleUpdatingProject(changedProject);
  }

  const handleDelete = (deleteProject) => {
    handleDeleteProject(deleteProject);
    navigate.push('/projects/');
  }

  const currentColorScheme = ProjectColors(project);

  const isMenuOpen = Boolean(moreAnchorEl);

  const handleMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setMoreAnchorEl(null);
  }

  const handleOpenModel = () => setOpenModal(true);
  const handleCloseModel = () => setOpenModal(false);

  return (
    <>
      {project && Object.keys(project).length > 0 ? (
        <>
          <Container maxWidth='xl' sx={{ height: '80vh', overflow: 'scroll' }}>
            <Grid
              item
              container
              alignContent='center'
              justifyContent='space-between'
              sx={{ pb: 6 }}>
              <Box className='flex'>
                <Tooltip
                  title={project.favorite ? 'Remove Favorite' : 'Add Favorite'}>
                  <IconButton
                    onClick={handleFavoringAProject}
                    size='large'
                    sx={{
                      color: currentColorScheme
                        ? currentColorScheme.colorDark
                        : 'inherit',
                    }}>
                    {project.favorite ? (
                      <StarIcon fontSize='large' />
                    ) : (
                      <StarBorderIcon fontSize='large' />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant='h3' component='h2'>
                  {project.title}
                </Typography>
              </Box>

              <Box className='flex'>
                <Tooltip title='Project Options'>
                  <IconButton
                    aria-label='show options'
                    aria-controls='project-options'
                    aria-haspopup='true'
                    onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <DropdownMenu
                moreAnchorEl={moreAnchorEl}
                isMenuOpen={isMenuOpen}
                handleMenuClose={handleMenuClose}
                handleOpenModel={handleOpenModel}
                handleDelete={handleDelete}
                component={project}
                componentType='Project'
              />

              <ProjectModal
                project={project}
                openModal={openModal}
                handleCloseModel={handleCloseModel}
                handleUpdatingProject={handleChange}
                mode={mode}
              />
            </Grid>

            <Boards
              boards={boards}
              setBoards={setBoards}
              fetchProject={fetchProject}
              mode={mode}
              colors={currentColorScheme}
              projectId={project.id}
            />
          </Container>
        </>
      ) : (
        <Container maxWidth='xl' sx={{ height: '80vh' }}>
          <Grid
            item
            container
            alignContent='center'
            justifyContent='space-between'
            sx={{ pb: 6 }}>
            <Skeleton width='60%' />
          </Grid>
          <Grid container spacing={2}>
            {[1, 2, 3].map((load) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  key={`loadboard-${load}`}>
                  <Skeleton />
                  <Skeleton
                    sx={{ height: 400 }}
                    animation='wave'
                    variant='rectangular'
                  />
                </Grid>
              )
            })}
          </Grid>
        </Container>
      )}
    </>
  )
}

export default ProjectDashboard
