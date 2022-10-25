import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Button, ButtonGroup, Chip, CircularProgress, createTheme, Grid, TextField, Typography} from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import RadioGroupRating from "./RadioGroupRating";
import {ThemeProvider} from "@emotion/react";
import atlat_logo from "./images/atlat_full_logo.png"
import expert_ai_logo from "./images/expert-ai-logo.png"

function App() {

    const example1 = "Do not tell my boss Viet Thien that I complained here. I am afraid that he will fire me. I" +
        " need this job to nurture my family. At the Tannery Leather Huan in Hồ Chí Minh city where I work, we have a huge problem with the chemical waste management. The factory pollutes the environment with chemical waste. Our boss gives us the animal hides and wants us to clean it. The chemicals are harsh on our skin. The chemical bottle says that we should wear safety gloves. But our boss does not give them to us. When we asked for it once, he screamed, that the gloves are too expensive He was so loud and angry, the I got scared. Everybody scared him. If we do not want to clean the animal hides without gloves, he will find someone else who will. But we need the money, so we stayed. After the work, the water is so dirty from all the animal and chemicals. We dumped the dirty water with all the toxic chemical wate in the river. It stinks a lot, too. I feel really ashamed to do this. The waste water stinks and I ruin the river for the local community also needs the water. Many fish and plants in the river died. In the factory is a system to collect the wastewater and transport it to a treatment plant. But we are only allowed to use it when there are audits.";
    const example2 = "I work in the Sewing ABC factory in Hồ Chí Minh city. We must work so many hours of overtime" +
        " here! It makes us really angry that we work so much for so little money. Our contracts say that we work from 6 am to 6 pm Mondays to Fridays. My co-worker Nhi Le worked here for 4 years, she said she never left the factory on time. But on most days, we cannot finish at 6 pm. The bosses give us just much more work to do! When we say that it is 6 pm, they start to insult us, scream, say that we can be replaced. It is really insulting! We finish on most days between 8 to 9 pm instead of at 6. I live at 37 Bạch Vân, Phường 5, Quận 5, Thành phố Hồ Chí Minh, Vietnam. This is far away from the factory. I often just arrive at 10 pm, this is so late! Also, we must come on many Saturdays as well to finish all the work they force us to do. All these extra hours are not compensated. We get the same salary, no matter what. It makes me so furious that there is no proper compensation for my work. The salary is also given to us in cash instead of via bank transfer. They say, it is better for us with taxes. But I think they just want to hide that they do not pay out our extra hours properly.";
    const example3 = "The factory did terminate the contracts of a group of workers, including mine. All cancelled workers are women. They did not give an explanation. However, most of the terminated workers are pregnant. Some, like my coleage Nhi Thien, are already in the sixth month. It is not legal to terminate pregnant workers shortly before they give birth. This is a discrimination in Vietnam and this violates the code of labour. We are very angry that the factory breaks the law and does not comply!";

    const [complaintText, setComplaintText] = useState("");
    const [complaintAnalysis, setComplaintAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    function analyzeComplaint() {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/complaint-analysis`, {
            language: "en",
            complaintText: complaintText
        })
            .then((response) => {
                setComplaintAnalysis(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1b8591',
            },
            secondary: {
                main: '#5b627c',
            },
            warning: {
                main: '#F8A18E'
            }
        },
    });
    return (

        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs={3}>
                    <Paper elevation={3} sx={{width: 800, p: 5, m: 5}}>
                        <Typography variant="h3" component="div" gutterBottom>
                            Complaint Analyzer by <img style={{marginBottom: -20}} src={atlat_logo} alt="atlat Logo"/>
                        </Typography>

                        <TextField
                            label="Complaint Text"
                            multiline
                            rows={7}
                            value={complaintText}
                            onChange={e => setComplaintText(e.target.value)}
                            sx={{width: 800}}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'space-between', pt: 2}}>
                            <ButtonGroup
                                aria-label="vertical outlined button group"
                            >
                                <Button key="example1" onClick={() => setComplaintText(example1)}>Example 1</Button>
                                <Button key="example2" onClick={() => setComplaintText(example2)}>Example 2</Button>
                                <Button key="example3" onClick={() => setComplaintText(example3)}>Example 3</Button>
                            </ButtonGroup>
                            <Button variant="contained" endIcon={<SendIcon/>}
                                    onClick={analyzeComplaint}>Analyze</Button>
                        </Box>
                        {loading && <CircularProgress sx={{p: 3}}/>}
                        {complaintAnalysis && !loading && <Box pt={3}>
                            {complaintAnalysis.emotionalTraits && complaintAnalysis.emotionalTraits.length > 0 &&
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Emotional Traits
                                </Typography>
                                {complaintAnalysis.emotionalTraits.map((emotionalTrait) =>
                                    <Chip label={emotionalTrait} color={"primary"} sx={{mr: 1}} variant="outlined"/>)}
                            </>}
                            {complaintAnalysis.esgCategories && complaintAnalysis.esgCategories.length > 0 &&
                            <>
                                <Typography variant="h5" gutterBottom>
                                    ESG Categories
                                </Typography>
                                {[...new Set(complaintAnalysis.esgCategories)].map((esgCategory) =>
                                    <Chip label={esgCategory} color={"primary"} sx={{mr: 1}} variant="outlined"/>)}
                            </>}

                            {(complaintAnalysis.sentiment || complaintAnalysis.sentiment === 0) && <>
                                <Typography variant="h5" gutterBottom pt={1}>
                                    Sentiment
                                </Typography>
                                <RadioGroupRating sentiment={complaintAnalysis.sentiment}/>
                            </>}
                            <Typography variant="h5" gutterBottom pt={1}>
                                Complaint Text without PII
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {complaintAnalysis.complaintTextWithoutPersonalInformation}
                            </Typography>
                        </Box>}
                        <Typography variant="h6" gutterBottom pt={3}>
                            powered by <img style={{height: 50, marginBottom: -5}} src={expert_ai_logo}
                                            alt="expert.ai Logo"/>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            This is atlat's submission to expert.ai's hackathon <a
                            href="https://expertai-nlapi-092022.devpost.com/">Turn Language into Action: A Natural
                            Language Hackathon for Good</a>.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}

export default App;
