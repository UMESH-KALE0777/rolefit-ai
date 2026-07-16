from loguru import logger
import sys

def setup_logging():
    # Remove default logger
    logger.remove()
    
    # Add console logger
    logger.add(
        sys.stdout,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
        level="INFO",
        colorize=True
    )
    
    # Add file logger
    logger.add(
        "logs/rolefit.log",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {function} | {message}",
        level="INFO",
        rotation="10 MB",
        retention="7 days",
        compression="zip"
    )
    
    return logger