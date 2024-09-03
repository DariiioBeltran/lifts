import { LineChart } from '@mui/x-charts/LineChart';
import { useStatsContext } from "../StatsContext";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const ExerciseGraph = () => {
    const stats = useStatsContext()
    if (!stats.setRecords) { return null;}

    const dataset = stats.setRecords.map((sr) => {
        return (
            {
                x: new Date(sr.created_at),
                y: sr.volume,
            }
        );
    })

    const valueFormatter = (date: Date) =>
        date.toLocaleDateString('fr-FR', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
        });

    return (
        <Container sx={{ marginTop: 4 }}>
            <Box
                sx={{ background: "black" }}
            >
                {(stats.setRecords.length > 0) 
                    ? 
                        <>
                            <Box display="flex" flexDirection="row" justifyContent="center" py={0}>
                                <Typography variant="h4" color="primary">{stats.setRecords[0].exercise_outline.notional_exercise.exercise_name}</Typography>
                            </Box>
                            <LineChart
                                dataset={dataset}
                                xAxis={[{ dataKey: 'x', valueFormatter, scaleType: 'point' }]}
                                series={[{ dataKey: 'y' }]}
                                height={600}
                                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                                grid={{ vertical: true, horizontal: true }}
                            />
                        </>
                    :
                        <Box display="flex" flexDirection="row" justifyContent="center" py={0}>
                            <Typography variant="h4" color="primary">Have you been skipping these?</Typography>
                        </Box>
                }
            </Box>
        </Container>
    );
}

export default ExerciseGraph;