import * as React from 'react';
import './inicio.scss';
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



const RecipeReviewCard = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (props.info == null) {
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


                title={props.info.strMeal}
                subheader={props.info.dateModified != null ? props.info.dateModified : null}
                style={{ padding: "0" }}
            />
            <CardMedia
                component="img"
                
                image={props.info.strMealThumb}
                style={{ borderRadius: "5px", margin: "0 auto", width: "80%" }}
            />
            <CardContent>
                <Typography variant="body2" color="white">
                    Category: {props.info['strCategory']}
                </Typography>
            </CardContent>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>How to:</Typography>
                    <Typography paragraph style={{ textAlign: "justify" }}>
                        {props.info.strInstructions}
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RecipeReviewCard;