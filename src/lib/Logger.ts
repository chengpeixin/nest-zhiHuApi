import { WinstonModule } from 'nest-winston'
import * as Winston from 'winston'
import { LoggerService } from '@nestjs/common';
const  { combine, timestamp, label, printf } = Winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
export function getLogger():LoggerService{
    let transports:Array<any> = [
        new Winston.transports.File(
            {
                filename:'error.log',
                level:'error',
                format: combine(timestamp(),myFormat)
            }
        ),
    ]
    if (process.env.NODE_ENV !== 'production') {
        transports.push(
            new Winston.transports.Console({
                level: 'info',
                format: Winston.format.combine(
                    Winston.format.colorize(),
                    Winston.format.simple()
                )
            })
        )
        transports.push(
            new Winston.transports.Console({ level: 'warn',format:Winston.format.json()}),
        )
    }
    return WinstonModule.createLogger({
        transports:transports
    })
}

