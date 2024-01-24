// styles.js
const styles = (theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    gap: 30,
    alignItems: "center",
    marginBottom: theme.spacing(2),
    width: "100%",
    justifyContent: "center",
  },
  logo: {
    maxHeight: "100px",
    maxWidth: "100px",
  },
  questionGrid: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  questionItem: {
    width: "48%",
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  questionLabel: {
    fontWeight: "bold",
    alignItems: "center",
  },
  radioGroup: {
    "& .MuiFormControlLabel-root": {
      margin: theme.spacing(0, 0),
    },
  },
});

export default styles;
