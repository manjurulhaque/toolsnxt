Add-Type -AssemblyName System.Drawing

function Generate-PwaIcon {
    param(
        [int]$size,
        [string]$outputPath,
        [bool]$maskable = $false
    )

    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $bgColor = [System.Drawing.Color]::FromArgb(255, 33, 37, 41)
    $accentRust = [System.Drawing.Color]::FromArgb(255, 184, 93, 56)
    $creamColor = [System.Drawing.Color]::FromArgb(255, 245, 239, 230)

    if ($maskable) {
        $bgBrush = New-Object System.Drawing.SolidBrush($bgColor)
        $g.FillRectangle($bgBrush, 0, 0, $size, $size)
        $bgBrush.Dispose()
        
        $diskRadius = [float]($size * 0.26)
        $diskBrush = New-Object System.Drawing.SolidBrush($accentRust)
        $g.FillEllipse($diskBrush, [float]($size * 0.5 - $diskRadius), [float]($size * 0.5 - $diskRadius), $diskRadius * 2, $diskRadius * 2)
        $diskBrush.Dispose()

        $penWidth = [float]($size * 0.055)
        $pen = New-Object System.Drawing.Pen($creamColor, $penWidth)
        $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
        $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

        $topY = [float]($size * 0.40)
        $midY = [float]($size * 0.52)
        $botY = [float]($size * 0.63)
        $leftX = [float]($size * 0.38)
        $midX = [float]($size * 0.50)
        $rightX = [float]($size * 0.62)

        $points = @(
            (New-Object System.Drawing.PointF($leftX, $botY)),
            (New-Object System.Drawing.PointF($leftX, $topY)),
            (New-Object System.Drawing.PointF($midX, $midY)),
            (New-Object System.Drawing.PointF($rightX, $topY)),
            (New-Object System.Drawing.PointF($rightX, $botY))
        )
        $g.DrawLines($pen, $points)
        $pen.Dispose()
    } else {
        $corner = [float]($size * 0.22)
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddArc(0, 0, $corner * 2, $corner * 2, 180, 90)
        $path.AddArc($size - $corner * 2, 0, $corner * 2, $corner * 2, 270, 90)
        $path.AddArc($size - $corner * 2, $size - $corner * 2, $corner * 2, $corner * 2, 0, 90)
        $path.AddArc(0, $size - $corner * 2, $corner * 2, $corner * 2, 90, 90)
        $path.CloseFigure()

        $bgBrush = New-Object System.Drawing.SolidBrush($bgColor)
        $g.FillPath($bgBrush, $path)
        $bgBrush.Dispose()

        $diskRadius = [float]($size * 0.28)
        $diskBrush = New-Object System.Drawing.SolidBrush($accentRust)
        $g.FillEllipse($diskBrush, [float]($size * 0.5 - $diskRadius), [float]($size * 0.5 - $diskRadius), $diskRadius * 2, $diskRadius * 2)
        $diskBrush.Dispose()

        $penWidth = [float]($size * 0.06)
        $pen = New-Object System.Drawing.Pen($creamColor, $penWidth)
        $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
        $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

        $topY = [float]($size * 0.39)
        $midY = [float]($size * 0.52)
        $botY = [float]($size * 0.64)
        $leftX = [float]($size * 0.37)
        $midX = [float]($size * 0.50)
        $rightX = [float]($size * 0.63)

        $points = @(
            (New-Object System.Drawing.PointF($leftX, $botY)),
            (New-Object System.Drawing.PointF($leftX, $topY)),
            (New-Object System.Drawing.PointF($midX, $midY)),
            (New-Object System.Drawing.PointF($rightX, $topY)),
            (New-Object System.Drawing.PointF($rightX, $botY))
        )
        $g.DrawLines($pen, $points)
        $pen.Dispose()
        $path.Dispose()
    }

    $g.Dispose()
    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
    Write-Output "Generated: $outputPath ($size x $size)"
}

Generate-PwaIcon -size 192 -outputPath "public/icons/icon-192.png" -maskable $false
Generate-PwaIcon -size 512 -outputPath "public/icons/icon-512.png" -maskable $false
Generate-PwaIcon -size 512 -outputPath "public/icons/icon-maskable-512.png" -maskable $true
Generate-PwaIcon -size 180 -outputPath "public/icons/apple-touch-icon.png" -maskable $false
