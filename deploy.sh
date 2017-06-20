#!/bin/bash

set -e
exp login -p "${EXP_KEY}" -u colby-white
exp build:android --non-interactive
until "exp build:status | grep APK"; do sleep 30s; done
