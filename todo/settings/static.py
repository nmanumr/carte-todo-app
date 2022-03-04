import os

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'


def configure_static(settings):
    settings['STATIC_ROOT'] = os.path.join(settings['BASE_DIR'], 'static')
    settings['MEDIA_ROOT'] = os.path.join(settings['BASE_DIR'], 'media')
