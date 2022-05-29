import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RefreshTokenDto } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService) {}
    
    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto) {
        return await this.tokenService.refreshToken(data.oldToken)

    }
}