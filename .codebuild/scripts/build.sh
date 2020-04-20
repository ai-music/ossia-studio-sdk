#!/usr/bin/env bash

set -e

# Exit early if no branch found
if [[ -z ${1} ]]; then
     echo "No branch found, received >> ${1} <<"
     exit 1
fi

# BUILD (Production and Staging)
if [[ -z ${AI_MUSIC_STAGE} ]]; then
     echo "AI_MUSIC_STAGE is missing"
     exit 1
fi

if [[ "${1}" == "${PRODUCTION_BRANCH}" ]]; then
     # Build push and deploy for staging and production
     echo "${AI_MUSIC_STAGE} build >> BRANCH: ${BRANCH} << branch"

     # SDK
     cd ${CODEBUILD_SRC_DIR}
     cp /root/.npmrc ${CODEBUILD_SRC_DIR}
     yarn
fi