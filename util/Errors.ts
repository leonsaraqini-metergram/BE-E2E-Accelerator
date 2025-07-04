/**
 * An object containing error messages used throughout the application.
 * @constant
 * @type {Object}
 * @property {string} ENV_UNDEFINED - Error message when the environment is not defined.
 * @property {function(string): string} CONFIG_NOT_FOUND - Error message for when a configuration is not found for a specific environment.
 * @property {string} HOSTNAMEAPI_UNDEFINED - Error message when HOSTNAMEAPI is not defined in the environment variables.
 */

export const ERRORS = {
    ENV_UNDEFINED: "Environment must be defined.",
    CONFIG_NOT_FOUND: (env: string) => `No configuration found for environment: ${env}`,
    HOSTNAMEAPI_UNDEFINED: "HOSTNAMEAPI must be defined in the environment variables.",
};
