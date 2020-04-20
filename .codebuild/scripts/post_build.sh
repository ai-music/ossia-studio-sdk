#!/usr/bin/env bash

set -e

echo "${AI_MUSIC_STAGE} post build >> ${1} << branch"

if [[ ! "${CODEBUILD_BUILD_SUCCEEDING}" -eq 1 ]]; then
  echo "Something went wrong in a previous step, not continuing with post_build"
  exit 1
fi

# BUILD (Production)
if [[ "$1" == "${PRODUCTION_BRANCH}" ]]; then
  # Bump Version
  cd ${CODEBUILD_SRC_DIR}
  npx semantic-release
fi
