import { ILogObject, Logger } from 'tslog';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  symlinkSync,
  unlinkSync,
} from 'fs';
import * as moment from 'moment';
import { LOGGER_DATE_FORMAT, YYYYMMDD_DASH } from 'src/const/DateFormat';

const LOG_RETENTION_DAYS = 2;
const logDir = `${process.env.HOME}/logs`;
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
const symlinkFilename = 'app.log';

function format(logObject: ILogObject) {
  return `${moment(logObject.date).format(
    LOGGER_DATE_FORMAT,
  )} ${logObject.logLevel.toUpperCase().padStart(5, ' ')} [${
    logObject.filePath
  }:${logObject.lineNumber} ${
    logObject.typeName && logObject.methodName
      ? logObject.typeName + '.' + logObject.methodName
      : logObject.functionName
  }] ${logObject.argumentsArray}`;
}

function removeOldFiles(logDir: string, currentDate: Date) {
  const filenames = readdirSync(logDir);
  for (const filename of filenames) {
    if (
      filename.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).log$/)
    ) {
      const retentionLimitDate = moment(currentDate)
        .clone()
        .add(-LOG_RETENTION_DAYS, 'days');
      const logDate = moment(filename.split('.')[0], YYYYMMDD_DASH);
      if (logDate.isSameOrBefore(retentionLimitDate, 'day')) {
        unlinkSync(`${logDir}/${filename}`);
      }
    }
  }
}

function logToTransport(logObject: ILogObject) {
  try {
    const logFilename = `${moment(logObject.date).format(YYYYMMDD_DASH)}.log`;
    const logFilepath = `${logDir}/${logFilename}`;
    appendFileSync(logFilepath, format(logObject) + '\n');

    const symlinkFilepath = `${logDir}/${symlinkFilename}`;
    if (existsSync(symlinkFilepath)) {
      const link = readlinkSync(symlinkFilepath);
      if (link !== logFilepath) {
        unlinkSync(symlinkFilepath);
        symlinkSync(logFilepath, symlinkFilepath);
      }

      removeOldFiles(logDir, logObject.date);
    } else {
      symlinkSync(logFilepath, symlinkFilepath);
    }
  } catch (e) {
    console.error(`log file error`, e);
  }
}

const logger = new Logger({
  dateTimeTimezone: 'Asia/Seoul',
});

logger.attachTransport(
  {
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
  },
  'debug',
);

export const log = logger;
