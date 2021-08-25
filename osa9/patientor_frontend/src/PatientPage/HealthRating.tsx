import { SemanticCOLORS } from "semantic-ui-react";
import { HealthCheckRating } from "../types";

const assertNever = (value: number): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const HealthRating = (rating: HealthCheckRating): SemanticCOLORS | undefined => {
    switch (rating) {
        case 0:
            return "green";
        case 1:
            return "olive";
        case 2:
            return "orange";
        case 3:
            return "red";
        default:
            assertNever(rating);
    }
    return undefined;
};

export default HealthRating;