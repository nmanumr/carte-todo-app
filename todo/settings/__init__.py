from .apps import *
from .auth import *
from .base import *
from .database import *
from .drf import *
from .host import *
from .logging import *
from .templates import *

# Delayed configuration
settings = locals()
for key in list(settings.keys()):
    if key.startswith('configure_'):
        settings[key](settings)
