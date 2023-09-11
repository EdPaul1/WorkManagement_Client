import { palette } from '../theme/palette'

export const ProjectColors = (project) => {
    const matchingColor = palette.find((c) => c.mainColor === project.color);
    if (matchingColor) {
        return matchingColor;
    } else {
        // Handle the case when no matching color is found
        // You can return a default color or throw an error
        return palette[0]; // Return the first color as a default
    }
}
