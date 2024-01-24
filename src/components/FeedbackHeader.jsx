import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const FeedbackHeader = ({ companyLogo, unitName, classes }) => (
  <div className={classes.header}>
    {companyLogo && (
      <img src={companyLogo} alt="Company Logo" className={classes.logo} />
    )}
    {unitName && <Typography variant="h5">{unitName}</Typography>}
  </div>
);

FeedbackHeader.propTypes = {
  companyLogo: PropTypes.string,
  unitName: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default FeedbackHeader;
