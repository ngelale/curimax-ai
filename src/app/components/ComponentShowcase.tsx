import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info,
  Download,
  Upload,
  Settings,
  Trash2,
  Eye,
  Edit,
  Search,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { DataTableDemo } from "./DataTableDemo";
import { ChartsDemo } from "./ChartsDemo";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

export function ComponentShowcase() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="w-full min-h-screen">
      <Toaster />
      
      {/* Modern Hero Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003D7A]">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/20 to-transparent" />
        
        <div className="relative container mx-auto px-8 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-[14px]">Modern Design System</span>
            </div>
            <h1 className="text-[48px] leading-[1.1] text-white mb-6">
              Ultra-Modern Component Library
            </h1>
            <p className="text-[18px] leading-[28px] text-white/80 max-w-2xl">
              A comprehensive showcase of beautifully designed UI components following industry-leading design principles and modern aesthetics.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-[14px]">Components</span>
                  <Zap className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="text-[32px] text-white">40+</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-[14px]">Variants</span>
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                </div>
                <div className="text-[32px] text-white">100+</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-[14px]">Design Tokens</span>
                  <Settings className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="text-[32px] text-white">50+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        
        {/* Color Palette Section - Redesigned */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Color Palette</h2>
            <p className="text-muted-foreground text-[16px]">Semantic color system designed for clarity and accessibility</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl h-48 bg-gradient-to-br from-[#0066CC] to-[#0052A3] mb-4 shadow-lg shadow-[#0066CC]/20 hover:shadow-2xl hover:shadow-[#0066CC]/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-[20px] mb-1">Primary</div>
                  <div className="text-white/80 text-[14px] font-mono">#0066CC</div>
                </div>
              </div>
              <p className="text-[14px] text-muted-foreground">Actions, CTAs, Primary Elements</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl h-48 bg-gradient-to-br from-[#10B981] to-[#059669] mb-4 shadow-lg shadow-[#10B981]/20 hover:shadow-2xl hover:shadow-[#10B981]/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-[20px] mb-1">Success</div>
                  <div className="text-white/80 text-[14px] font-mono">#10B981</div>
                </div>
              </div>
              <p className="text-[14px] text-muted-foreground">Completion, Positive States</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl h-48 bg-gradient-to-br from-[#F59E0B] to-[#D97706] mb-4 shadow-lg shadow-[#F59E0B]/20 hover:shadow-2xl hover:shadow-[#F59E0B]/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-[20px] mb-1">Warning</div>
                  <div className="text-white/80 text-[14px] font-mono">#F59E0B</div>
                </div>
              </div>
              <p className="text-[14px] text-muted-foreground">In Progress, Caution States</p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl h-48 bg-gradient-to-br from-[#EF4444] to-[#DC2626] mb-4 shadow-lg shadow-[#EF4444]/20 hover:shadow-2xl hover:shadow-[#EF4444]/30 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-[20px] mb-1">Error</div>
                  <div className="text-white/80 text-[14px] font-mono">#EF4444</div>
                </div>
              </div>
              <p className="text-[14px] text-muted-foreground">Errors, Critical Items</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Typography</h2>
            <p className="text-muted-foreground text-[16px]">Carefully crafted type scale for optimal readability</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 space-y-8">
              <div className="flex items-baseline gap-6 pb-6 border-b">
                <div className="text-[12px] text-muted-foreground w-32 flex-shrink-0">H1 · 32px</div>
                <h1 className="text-[32px] leading-[40px]">The quick brown fox jumps</h1>
              </div>
              <div className="flex items-baseline gap-6 pb-6 border-b">
                <div className="text-[12px] text-muted-foreground w-32 flex-shrink-0">H2 · 24px</div>
                <h2 className="text-[24px] leading-[32px]">The quick brown fox jumps</h2>
              </div>
              <div className="flex items-baseline gap-6 pb-6 border-b">
                <div className="text-[12px] text-muted-foreground w-32 flex-shrink-0">H3 · 20px</div>
                <h3 className="text-[20px] leading-[28px]">The quick brown fox jumps</h3>
              </div>
              <div className="flex items-baseline gap-6 pb-6 border-b">
                <div className="text-[12px] text-muted-foreground w-32 flex-shrink-0">Body · 16px</div>
                <p className="text-[16px] leading-[24px]">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="flex items-baseline gap-6 pb-6 border-b">
                <div className="text-[12px] text-muted-foreground w-32 flex-shrink-0">Small · 14px</div>
                <p className="text-[14px] leading-[20px]">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="flex items-baseline gap-6">
                <div className="text-[12px] text-muted-foreground w-32 flex-shrink-0">Tiny · 12px</div>
                <p className="text-[12px] leading-[16px]">The quick brown fox jumps over the lazy dog</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section - Ultra Modern */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Buttons</h2>
            <p className="text-muted-foreground text-[16px]">Interactive elements with smooth animations and clear states</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Primary Actions</CardTitle>
                <CardDescription>Main call-to-action buttons</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-[#0066CC] hover:bg-[#0052A3] shadow-lg shadow-[#0066CC]/20 hover:shadow-xl hover:shadow-[#0066CC]/30 transition-all">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button className="bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-[#10B981]/20 hover:shadow-xl hover:shadow-[#10B981]/30 transition-all">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Success
                  </Button>
                  <Button className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003D7A] text-white shadow-lg shadow-[#0066CC]/30 transition-all">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Premium
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Secondary Actions</CardTitle>
                <CardDescription>Supporting actions and navigation</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="border-2 hover:bg-slate-50 hover:border-[#0066CC] transition-all">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" className="border-2 hover:bg-slate-50 hover:border-[#10B981] transition-all">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button variant="outline" className="border-2 hover:bg-slate-50 hover:border-[#EF4444] transition-all">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Button Sizes</CardTitle>
                <CardDescription>Multiple size variants</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" className="bg-[#0066CC] hover:bg-[#0052A3]">Small</Button>
                  <Button className="bg-[#0066CC] hover:bg-[#0052A3]">Default</Button>
                  <Button size="lg" className="bg-[#0066CC] hover:bg-[#0052A3]">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Destructive Actions</CardTitle>
                <CardDescription>Dangerous or critical actions</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-4">
                  <Button variant="destructive" className="shadow-lg shadow-[#EF4444]/20">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Item
                  </Button>
                  <Button variant="outline" className="border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Input Components - Modern Design */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Input Components</h2>
            <p className="text-muted-foreground text-[16px]">Form elements with enhanced usability and aesthetics</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Text Inputs</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="mt-2 border-2 focus:border-[#0066CC] transition-colors" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="john@example.com" 
                    className="mt-2 border-2 focus:border-[#0066CC] transition-colors" 
                  />
                </div>
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="search" 
                      placeholder="Search..." 
                      className="pl-10 border-2 focus:border-[#0066CC] transition-colors" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Select & Textarea</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category" className="mt-2 border-2">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Enter your message..." 
                    className="mt-2 border-2 focus:border-[#0066CC] transition-colors resize-none"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Toggle Switches</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-[#0066CC]/50 transition-colors">
                    <div>
                      <Label htmlFor="notifications" className="cursor-pointer">Push Notifications</Label>
                      <p className="text-[14px] text-muted-foreground mt-1">Receive push notifications on your device</p>
                    </div>
                    <Switch id="notifications" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-[#0066CC]/50 transition-colors">
                    <div>
                      <Label htmlFor="emails" className="cursor-pointer">Email Updates</Label>
                      <p className="text-[14px] text-muted-foreground mt-1">Get email updates about your activity</p>
                    </div>
                    <Switch id="emails" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-[#0066CC]/50 transition-colors">
                    <div>
                      <Label htmlFor="marketing" className="cursor-pointer">Marketing Emails</Label>
                      <p className="text-[14px] text-muted-foreground mt-1">Receive emails about new features</p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-[#0066CC]/50 transition-colors">
                    <div>
                      <Label htmlFor="analytics" className="cursor-pointer">Analytics</Label>
                      <p className="text-[14px] text-muted-foreground mt-1">Help us improve by sharing analytics</p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards & Metrics */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Cards & Metrics</h2>
            <p className="text-muted-foreground text-[16px]">Display important information and key metrics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#0066CC]" />
                  </div>
                  <div className="flex items-center gap-1 text-[#10B981] text-[14px]">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>12%</span>
                  </div>
                </div>
                <div className="text-[14px] text-muted-foreground mb-1">Total Users</div>
                <div className="text-[28px]">24,583</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div className="flex items-center gap-1 text-[#10B981] text-[14px]">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>23%</span>
                  </div>
                </div>
                <div className="text-[14px] text-muted-foreground mb-1">Revenue</div>
                <div className="text-[28px]">$89,432</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div className="flex items-center gap-1 text-[#10B981] text-[14px]">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>8%</span>
                  </div>
                </div>
                <div className="text-[14px] text-muted-foreground mb-1">Orders</div>
                <div className="text-[28px]">1,429</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#EF4444]" />
                  </div>
                  <div className="flex items-center gap-1 text-[#EF4444] text-[14px]">
                    <ArrowDownRight className="w-4 h-4" />
                    <span>3%</span>
                  </div>
                </div>
                <div className="text-[14px] text-muted-foreground mb-1">Conversion</div>
                <div className="text-[28px]">3.24%</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges & Status */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Badges & Status Indicators</h2>
            <p className="text-muted-foreground text-[16px]">Visual indicators for states and categories</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[20px] leading-[28px] mb-4">Status Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-[#10B981] hover:bg-[#059669] px-4 py-2 text-[14px]">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Success
                    </Badge>
                    <Badge className="bg-[#F59E0B] hover:bg-[#D97706] px-4 py-2 text-[14px]">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Warning
                    </Badge>
                    <Badge className="bg-[#EF4444] hover:bg-[#DC2626] px-4 py-2 text-[14px]">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Error
                    </Badge>
                    <Badge className="bg-[#0066CC] hover:bg-[#0052A3] px-4 py-2 text-[14px]">
                      <Info className="mr-2 h-4 w-4" />
                      Info
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-[20px] leading-[28px] mb-4">Outline Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="border-2 border-[#10B981] text-[#10B981] px-4 py-2 text-[14px]">
                      Active
                    </Badge>
                    <Badge variant="outline" className="border-2 border-[#F59E0B] text-[#F59E0B] px-4 py-2 text-[14px]">
                      Pending
                    </Badge>
                    <Badge variant="outline" className="border-2 border-[#EF4444] text-[#EF4444] px-4 py-2 text-[14px]">
                      Inactive
                    </Badge>
                    <Badge variant="outline" className="border-2 border-[#0066CC] text-[#0066CC] px-4 py-2 text-[14px]">
                      Draft
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-[20px] leading-[28px] mb-4">Subtle Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 px-4 py-2 text-[14px]">
                      Completed
                    </Badge>
                    <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 px-4 py-2 text-[14px]">
                      In Progress
                    </Badge>
                    <Badge className="bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 px-4 py-2 text-[14px]">
                      Failed
                    </Badge>
                    <Badge className="bg-[#0066CC]/10 text-[#0066CC] hover:bg-[#0066CC]/20 px-4 py-2 text-[14px]">
                      New
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Progress & Loading */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Progress Indicators</h2>
            <p className="text-muted-foreground text-[16px]">Track completion and loading states</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Linear Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-[14px]">Current Progress</span>
                    <span className="text-[14px]">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3 [&>div]:bg-[#0066CC]" />
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      -10%
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10%
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-[14px]">Upload Progress</span>
                    <span className="text-[14px]">100%</span>
                  </div>
                  <Progress value={100} className="h-3 [&>div]:bg-[#10B981]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                <CardTitle className="text-[20px] leading-[28px]">Colored Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px]">Success</span>
                    <Badge className="bg-[#10B981] text-white">90%</Badge>
                  </div>
                  <Progress value={90} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#10B981] [&>div]:to-[#059669]" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px]">Warning</span>
                    <Badge className="bg-[#F59E0B] text-white">60%</Badge>
                  </div>
                  <Progress value={60} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#F59E0B] [&>div]:to-[#D97706]" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px]">Error</span>
                    <Badge className="bg-[#EF4444] text-white">25%</Badge>
                  </div>
                  <Progress value={25} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-[#EF4444] [&>div]:to-[#DC2626]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Tabs Navigation</h2>
            <p className="text-muted-foreground text-[16px]">Organize content into separate views</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Analytics</TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Reports</TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 p-6 bg-slate-50 rounded-xl">
                  <h3 className="text-[20px] leading-[28px] mb-3">Overview</h3>
                  <p className="text-[14px] text-muted-foreground">
                    View your dashboard overview with key metrics, recent activity, and quick actions.
                  </p>
                </TabsContent>
                <TabsContent value="analytics" className="mt-6 p-6 bg-slate-50 rounded-xl">
                  <h3 className="text-[20px] leading-[28px] mb-3">Analytics</h3>
                  <p className="text-[14px] text-muted-foreground">
                    Deep dive into your analytics data with detailed charts and performance metrics.
                  </p>
                </TabsContent>
                <TabsContent value="reports" className="mt-6 p-6 bg-slate-50 rounded-xl">
                  <h3 className="text-[20px] leading-[28px] mb-3">Reports</h3>
                  <p className="text-[14px] text-muted-foreground">
                    Access generated reports and export data for external analysis.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="mt-6 p-6 bg-slate-50 rounded-xl">
                  <h3 className="text-[20px] leading-[28px] mb-3">Settings</h3>
                  <p className="text-[14px] text-muted-foreground">
                    Configure your preferences and manage account settings.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Accordion */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Accordion</h2>
            <p className="text-muted-foreground text-[16px]">Expandable content sections</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-2">
                  <AccordionTrigger className="text-[16px] hover:no-underline">
                    What is this design system?
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-muted-foreground">
                    This is a comprehensive design system built with modern UI components, following industry best practices 
                    and accessibility guidelines. It includes a full color palette, typography scale, spacing system, and 
                    reusable components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-2">
                  <AccordionTrigger className="text-[16px] hover:no-underline">
                    How do I customize components?
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-muted-foreground">
                    Components are built with Tailwind CSS and support extensive customization through props and className 
                    overrides. You can modify colors, sizes, variants, and behavior to match your specific needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-2">
                  <AccordionTrigger className="text-[16px] hover:no-underline">
                    Is it responsive and accessible?
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-muted-foreground">
                    Yes! All components are fully responsive and follow WCAG accessibility guidelines. They work seamlessly 
                    across desktop, tablet, and mobile devices with proper keyboard navigation and screen reader support.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-[16px] hover:no-underline">
                    What technologies are used?
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-muted-foreground">
                    Built with React, TypeScript, Tailwind CSS, and Radix UI primitives. The component library uses shadcn/ui 
                    as a foundation with custom styling and enhancements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Dialogs */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Dialogs & Modals</h2>
            <p className="text-muted-foreground text-[16px]">Focused interactions and confirmations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-[#0066CC]" />
                </div>
                <h3 className="text-[18px] mb-2">Information</h3>
                <p className="text-[14px] text-muted-foreground mb-4">Display important information to users</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-2">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Information Dialog</DialogTitle>
                      <DialogDescription>
                        This is an informational dialog for displaying important messages to users.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-[14px]">Additional information and details can be displayed here with proper formatting and structure.</p>
                    </div>
                    <DialogFooter>
                      <Button className="bg-[#0066CC] hover:bg-[#0052A3]">Got it</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="text-[18px] mb-2">Success</h3>
                <p className="text-[14px] text-muted-foreground mb-4">Confirm successful operations</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-2">Show Success</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                        Operation Successful
                      </DialogTitle>
                      <DialogDescription>
                        Your changes have been saved successfully.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button className="bg-[#10B981] hover:bg-[#059669] text-white">Continue</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
                </div>
                <h3 className="text-[18px] mb-2">Confirmation</h3>
                <p className="text-[14px] text-muted-foreground mb-4">Confirm dangerous actions</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-2">Delete Item</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete the item from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Toast Notifications */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Toast Notifications</h2>
            <p className="text-muted-foreground text-[16px]">Brief, dismissible messages</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  className="bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-[#10B981]/20"
                  onClick={() => toast.success('Success!', {
                    description: 'Your action completed successfully',
                  })}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Success
                </Button>
                <Button
                  className="bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-lg shadow-[#EF4444]/20"
                  onClick={() => toast.error('Error!', {
                    description: 'Something went wrong',
                  })}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Error
                </Button>
                <Button
                  className="bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-lg shadow-[#F59E0B]/20"
                  onClick={() => toast.warning('Warning!', {
                    description: 'Please review your input',
                  })}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Warning
                </Button>
                <Button
                  className="bg-[#0066CC] hover:bg-[#0052A3] text-white shadow-lg shadow-[#0066CC]/20"
                  onClick={() => toast.info('Information', {
                    description: 'Here is some helpful info',
                  })}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Table */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Data Tables</h2>
            <p className="text-muted-foreground text-[16px]">Sortable and filterable data display</p>
          </div>
          <DataTableDemo />
        </section>

        {/* Charts */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Charts & Visualizations</h2>
            <p className="text-muted-foreground text-[16px]">Data visualization with Recharts</p>
          </div>
          <ChartsDemo />
        </section>

        {/* Spacing System */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[32px] leading-[40px] mb-3">Spacing System</h2>
            <p className="text-muted-foreground text-[16px]">4px base unit for consistent spacing</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80].map((size) => (
                  <div key={size} className="flex items-center gap-6">
                    <div className="w-20 text-[14px] text-muted-foreground font-mono">{size}px</div>
                    <div 
                      className="h-12 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] shadow-lg shadow-[#0066CC]/20 transition-all hover:shadow-xl flex items-center justify-center text-white text-[12px]" 
                      style={{ width: `${size}px` }}
                    >
                      {size > 16 && size}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-8 py-12">
          <div className="text-center">
            <h3 className="text-[24px] mb-3">Ready to build something amazing?</h3>
            <p className="text-muted-foreground mb-6">Start using these components in your next project</p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-[#0066CC] hover:bg-[#0052A3] shadow-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-2">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
