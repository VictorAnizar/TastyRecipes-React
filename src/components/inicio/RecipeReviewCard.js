import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RecipeReviewCard = ({ info }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (info == null) {
        return null
    }
    else return (
        <Card
            sx={{ maxWidth: 345 }}
            className="card-recipe"
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <CardHeader


                title={info.strMeal}
                subheader={info.dateModified != null ? info.dateModified : null}
            />
            <CardMedia
                component="img"
                height="5%"
                image={info.strMealThumb}

            />
            <CardContent>
                <Typography variant="body2" color="white">
                    Categoría: {info['strCategory']}
                </Typography>
            </CardContent>
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Preparación</Typography>
                    <Typography paragraph style={{ textAlign: "justify" }}>
                        {info.strInstructions}
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RecipeReviewCard;