#!/usr/bin/env bash

set -e

# Exit early if no branch found
if [[ -z ${1} ]]; then
  echo "No branch found, received >> ${1} <<"
  exit 1
fi

if [[ "${1}" == "${PRODUCTION_BRANCH}" ]]; then
  cd ${CODEBUILD_SRC_DIR}
  npx semantic-release --dry-run | grep "Published release" >>/tmp/semantic_release_dry_run | 2>&1 >/dev/null
  echo $(${WORKDIR}/scripts/semantic_release_get_next_version.sh /tmp/semantic_release_dry_run)
fi
